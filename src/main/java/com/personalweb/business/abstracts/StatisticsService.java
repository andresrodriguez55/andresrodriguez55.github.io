package com.personalweb.business.abstracts;

import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerCountriesResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerMonthsResponse;
import com.personalweb.business.dto.responses.get.GetAllMoreCommentedPostsResponse;
import com.personalweb.business.dto.responses.get.GetAllMostCommentersResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StatisticsService {
    Page<GetAllMoreCommentedPostsResponse> getMoreCommentedPosts(Pageable pageable);

    Page<GetAllMostCommentersResponse> getMostCommenters(Pageable pageable);

    List<GetAllCommentsCountPerMonthsResponse> getCommentsCountPerMonth();

    List<GetAllCommentsCountPerCountriesResponse> getCommentsCountPerCountry();
}
