import React from 'react'
import styled from 'styled-components'
import LeftListPanel from './LeftListPanel'
import RightListPanel from './RightListPanel'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 40px 12.5%;
    border-radius: 10px;
`;

const ListPanel = ({selectList, dropdownList, form, list, business, selectedList, type, tags = [], stories = [], updateCreateStoryForm, updateTasksOrder, departments = []}) => {
    return (
        <Container>
            <LeftListPanel selectList={selectList} list={list} business={business} selectedList={selectedList} departments={departments}/>
            <RightListPanel 
                updateTasksOrder={updateTasksOrder} 
                updateCreateStoryForm={updateCreateStoryForm}
                tags={tags} 
                dropdownList={dropdownList}
                stories={stories} 
                list={list} 
                business={business} 
                selectedList={selectedList} 
                type={type}
                form={form}
                departments={departments}
            />
        </Container>
    )
}

export default ListPanel