import React from 'react';

import CommentsPerMonthLineChartComponent from './components/CommentsPerMonthLineChartComponent';
import CountriesOfCommentsPieChart from './components/CountriesOfCommentsPieChartComponent';
import TopCommentedPostsComponent from './components/TopCommentedPostsComponent';
import TopCommentersNicknamesComponent from './components/TopCommentersNicknamesComponent';

import ApiStatisticsService from '../../api/ApiStatisticsService';

export default function Statistics()
{
    const apiStatisticsService = new ApiStatisticsService(process.env.REACT_APP_BACKEND_URL);

    const [commentsCountPerCountries, setCommentsCountPerCountries] = React.useState([]);
    const [commentsCountPerMonths, setCommentsCountPerMonths] = React.useState([]);
    const [mostCommenters, setMostCommenters] = React.useState([]);
    const [moreCommentedPosts, setMoreCommentedPosts] = React.useState([]);

    React.useEffect(async()=>
    {
        await fetchCommentsCountPerCountries();
        await fetchCommentsCountPerMonths();
        await fetchMostCommenters();
        await fetchMoreCommentedPosts();
    }, []);

    const fetchCommentsCountPerCountries = async () => {
        try {
            const result = await apiStatisticsService.fetchCommentsCountPerCountries();
            setCommentsCountPerCountries(result);
        } catch (error) {
            console.error('Failed to fetch comments count per country:', error);
        }
    };

    const fetchCommentsCountPerMonths = async () => {
        try {
            const result = await apiStatisticsService.fetchCommentsCountPerMonths();
            setCommentsCountPerMonths(result);
        } catch (error) {
            console.error('Failed to fetch comments count per month:', error);
        }
    };

    const fetchMostCommenters = async () => {
        try {
            const pageable = await apiStatisticsService.fetchMostCommentersPageable();
            setMostCommenters(pageable.content);
        } catch (error) {
            console.error('Failed to fetch most commenters:', error);
        }
    };

    const fetchMoreCommentedPosts = async () => {
        try {
            const pageable = await apiStatisticsService.fetchMoreCommentedPostsPageable();
            setMoreCommentedPosts(pageable.content);
        } catch (error) {
            console.error('Failed to fetch more commented posts:', error);
        }
    };

    return(
        <div>
            <TopCommentersNicknamesComponent topCommentersNicks={mostCommenters} />
            <TopCommentedPostsComponent topCommentedPosts={moreCommentedPosts} />
            <CountriesOfCommentsPieChart countriesOfComments={commentsCountPerCountries} />
            <CommentsPerMonthLineChartComponent numberOfCommentsPerMonth={commentsCountPerMonths} />
        </div>
    );
}