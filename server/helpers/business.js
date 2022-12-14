const business = require('../../models/Business');
const businessAudience = require('../../models/BusinessAudience');
const listItems = require('../../models/ListItems');
const likeHistory = require('../../models/LikeHistory');
const department = require('../../models/Department');
const departmentHelper = require('./department')
const tags = require('../../models/tags');
const user = require('../../models/User');
const mongoose = require('mongoose');
const { likeEnum } = require('../enum/likeEnum');

const createBusiness = async(data, id) => {
    // create business
    const newBusiness = await business.create(data);
    const audience = await businessAudience.create({
        ...data,
        business: await business.findById(newBusiness.id)
    })
    // create department management and assign main user to it
    const dep = await departmentHelper.addDepartmentToBusiness({
        name: 'Management',
        businessId: newBusiness.id,
        userId: id,
        tags: await tags.find({businessId: newBusiness.id})
    })
    // associate department with business
    await business.findByIdAndUpdate(newBusiness.id, {
        departments: [await department.findById(dep.id)],
        audience: await businessAudience.findById(audience.id)
    })
    return {msg: 'business created successfully'}
}

const updateBusiness = async (data) => {
    return await business.findByIdAndUpdate(data.listId, {$set:{...data}});
}

const deleteBusiness = async (id) => {
    await business.findByIdAndDelete(id);
    await listItems.deleteMany({listId: id})
    // set list history to archived
    // delete bussiness audience
    // delete questions
}

const getBusinessById = async (id, sub) => {
    try {
        await business.updateMany({userId: sub}, {$set: {isSelected: false}})
        const getBusiness = await business.findByIdAndUpdate(id, {$set: {isSelected: true}})
        const getUsers = await user.find({ _id: {$in: getBusiness.employees.map(e => e.profile)}}).select('email FirstName LastName profileImage freelancers')
        return {...getBusiness._doc, employees: getUsers, isSelected: true}
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

// list lists
const listBusinesses = async ({filter, take, skip}) => {
    try {
        const lists = await business.find({...filter})
            .skip( skip )
            .limit( take )
            .populate({
                path: 'listItems', 
                model: 'listItems'
            })
            .exec()
        return lists;
    } catch (e) {
        throw Error(`Could not find list, error: ${e}`);
    } 
}

// add like to business
const addLikeToBusiness = async (data, id) => {
    try {
        if (data.likeType === likeEnum.BUSINESS_LIKES || data.likeType === likeEnum.BUSINESS_DISLIKES) {
            await likeHistory.findOneAndUpdate({businessId: data.profileId, userId: id}, 
                { $set: { 
                    ...data,
                    freelancer: await freelancer.findById(data.profileId),
                    user: await user.findById(id)  
                }}, { upsert: true  })
            const ids = await likeHistory.find({profileId: data.profileId})
            const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
            const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
            // update users to have skills
            await business.findByIdAndUpdate(data.profileId, { 
                likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
                dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
                likeTotal: likes.length,
                dislikeTotal: dislikes.length
            });
            await user.findByIdAndUpdate(id, {
                likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
                dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
                likeTotal: likes.length,
                dislikeTotal: dislikes.length
            })
            return {likes: ids.length, msg: 'success'};
        }

    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}


module.exports = {
    createBusiness,
    listBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    addLikeToBusiness,
}