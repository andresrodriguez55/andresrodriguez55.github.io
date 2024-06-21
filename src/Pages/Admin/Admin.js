import React from 'react';

import CategoriesSectionComponent from './components/CategoriesSectionComponent';
import CommentsSectionComponent from './components/CommentsSectionComponent';
import SubscriptionsSectionComponent from './components/SubscriptionsSectionComponent';
import PostSectionComponent from './components/PostSectionComponent';
import "./Admin.css";

export default function Admin()
{
    
    return(
        <div className="adminScreen">
            <CategoriesSectionComponent />
            <CommentsSectionComponent />
            <SubscriptionsSectionComponent />
            <PostSectionComponent />
        </div>
    );
}