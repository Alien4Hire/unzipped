const express = require("express");
const router = express.Router();
const user = require('../../models/User');
const emailList = require('../../models/email');
const token = require('../../services/jwt');
const delToken = require('../../services/delCookie');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const userHelper = require('../helpers/user')
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../../services/Mailer');
const verifyTemplate = require('../../services/emailTemplates/verify');
const resetTemplate = require('../../services/emailTemplates/reset-password');
const contact = require('../../services/emailTemplates/contact');


router.get(
    '/google',
    passport.authenticate('google', {
    scope: ['profile', 'email']
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      if (req.isAuthenticated()) {
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: true });
        res.redirect(`/signup`);
        }
    }
);

// router.post('/register', (req, res) => {
//     passport.authenticate('local');
//     res.redirect('/');
// });

router.post(
    '/register',
    async (req, res, next) => {
      const {email, password} = req.body
      const data = req.body;
      try {
        //find user by email, if exists tell user to login
        const existingUser = await user.findOne({ email });
        //If a user exists check which signup method they used
        if (existingUser) {
          if (existingUser.googleId) {
            return res.send('Login with Google');
          } else {
            throw Error('User with this email already exists')
          }
        } else {
            //salt password
            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error('Something went wrong with bcrypt');

            const hash = await bcrypt.hash(password, salt);
            if (!hash) throw Error('Something went wrong hashing the password');
            ///Create user and save to database
            let newuser = await userHelper.createUser(data, hash)
            const existingUsers = await user.findOne({ email }).select('-password');

            // create notifications
            await userHelper.setUpNotificationsForUser();
            
            //send verification email
            const msg = {
              //recipients: existingUsers.email,
              id: newuser.id,
              name: email,
              recipients: [{email}],
              from: "support@vohnt.com",
              subject: "Verify your email to start using",
              text: "and easy to do anywhere, even with Node.js",
              html: "<strong>and easy to do anywhere, even with Node.js</strong>",
            };
            const mailer = new Mailer(msg, verifyTemplate(msg));
            // mailer.send();

            let t = token.signToken(newuser._id);
            // await newuser.save()
            res.cookie('access_token', t, { httpOnly: true });
            res.send({...existingUsers._doc, cookie: t})
            next();
          }
      } catch (e) {
        console.log('error error: ', e);
        res.status(400).send('User with this email already exists')
      }
    },
    ////Log user into app and redirect to localhost:3000
    // passport.authenticate('local', { failureRedirect: '/register' }),
    // (req, res) => {
      // if (req.isAuthenticated()) {
);

router.get('/verify/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await user.findByIdAndUpdate(id, {$set:{isEmailVerified: true}})
    const t = token.signToken(id);
    res.cookie('access_token', t, { httpOnly: true });
    res.redirect(`/`);
  } catch {
    res.status(400).send('verify failed'); 
  }
})

router.get('/reset/:id', async (req, res, next) => {
  const id = req.params.id;
  const existingUser = await user.findById(id).select('-password');
  await user.updateOne({email: existingUser._doc.email}, {$set:{emailVerified: true}})
  const t = token.signToken(id);
  const existingUsers = await user.findById(id).select('-password');
  // console.log(existingUsers)
  res.cookie('access_token', t, { httpOnly: true });
  res.redirect(`/change-password`);
})

router.post('/password', requireLogin, async (req, res, next) => {
  const password = req.body.password;
  const existingUser = await user.findById(req.user.sub);
  //salt password
  try {
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');
    
    await user.updateOne({email: existingUser._doc.email}, {$set:{password: hash}})
    const t = token.signToken(req.user.sub);
    const existingUsers = await user.findById(req.user.sub).select('-password').select('-stripeId');
    res.cookie('access_token', t, { httpOnly: true });
    res.send({...existingUsers._doc, cookie: token});
  } catch {
    console.log(e);
    res.status(400).send('Bad request');
  }
})


router.post('/resend', requireLogin, async (req, res, next) => {
  const { email } = req.body;
  const existinguser = await user.findById(req.user.sub).select('-password');
  if (email !== existinguser.email) {
    const exuser = await user.findById(req.user.sub).select('-password');
      if (exuser) {
        res.status(400).send('user with that email already exists');
      }
      const sub = req.user.sub;
      await user.updateOne({_id: sub}, {$set:{email: email}})
  }
  const existinguser2 = await user.findById(req.user.sub).select('-password');
  //send verification email
  const msg = {
    id: existinguser2._doc._id,
    // recipients: [email],
    name: existinguser2._doc.email,
    recipients: [{email}],
    from: "schedule@vohnt.com",
    subject: "Verify your email to start using",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  const token = req.header('access_token')
  try {
    const mailer = new Mailer(msg, verifyTemplate(msg));
    mailer.send();
  } catch {
    res.status(400).send('An error has occured')
  }
  
  res.send({...existinguser2._doc, cookie: token});
})

router.post('/reset', async (req, res, next) => {
  const existinguser = await user.findOne({ email: req.body.email });
  if (!existinguser || existinguser === null) {
    res.send({ message: 'User with that email does not exist'})
  } 
  if (existinguser) {
    //send verification email
    const msg = {
      id: existinguser._id,
      recipients: [{email}],
      name: existinguser.email,
      // recipients: [{email: "noreplyvohnt@gmail.com"}],
      from: "schedule@vohnt.com",
      subject: "Reset your Vohnt password",
    };
    const mailer = new Mailer(msg, resetTemplate(msg));
    mailer.send();
    res.send({ message: 'Check your email for instructions' })
  }
})

router.post('/contact', async (req, res, next) => {
  console.log(req.body.email)
    const msg = {
      recipients: [...req.body.email],
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      message: req.body.message,
      type: req.body.type,
      // recipients: [{email: "noreplyvohnt@gmail.com"}],
      from: "schedule@vohnt.com",
      subject: `${req.body.type} contact submission`,
    };
    try {
      const mailer = new Mailer(msg, contact(msg));
      mailer.send();
      res.send({ message: 'success' })
    } catch {
      res.status(400).send({ message: 'Please try again'});
    }
})
// router.post('/login', (req, res) => {
//     passport.authenticate('local');
//     res.redirect('/');
// });
  //login
router.post(
    '/login',
    async (req, res, next) => {
        const {email, password} = req.body
        ///check if user exists
        try {
        const existingUser = await user.findOne({ email });
        const existingUsers = await user.findOne({ email }).select('-password').select('-stripeId');
        if(!existingUser) throw Error('User does not exist');

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) throw Error('Invalid credentials');

        let t = token.signToken(existingUser._id);
        if(!t) throw Error('Invalid Credentials')
        console.log('cookie:' + t),
        res.cookie('access_token', t, { httpOnly: true }),
        res.json({...existingUsers._doc, msg: 'success', cookie: t}),
        
        next()
        } catch (e) {
        console.log(e);
        res.status(400).send('Email and Password do not match');
    }
})

router.get('/logout', (req, res) => {
    let t = delToken.signToken(123);
    req.logout();
    res.cookie('access_token', t, { httpOnly: true }),
    res.json({msg: 'success', cookie: t});
});

router.get('/current_user', requireLogin, async (req, res) => {
  try {
    const existinguser = await userHelper.getUserById(req.user.sub)
    if(!existinguser) throw Error('user does not exist')
    res.json(existinguser)
  } catch (e) {
    res.status(400).json({msg: e.message})
  }
});

router.post('/addMailing', async (req, res) => {
  let {email, firstName, lastName} = req.body;
  try {
    const existingEmail = await emailList.findOne({email});
    if (!existingEmail) {
    await emailList.create({email, firstName, lastName})
    }
    res.send({ message: 'success'})
  } catch (e) {
    res.status(400).send({ message: 'please try again'})
  }
});

router.post('/test', async (req, res) => {
  let {email, firstName, lastName} = req.body;
  try {
    await emailList.create({email, firstName, lastName})
    console.log(keys.mongoURI)
    res.send({ message: keys.mongoURI})
  } catch (e) {
    res.status(400).send({ message: 'please try again'})
  }
});

  

module.exports = router;