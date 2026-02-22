package com.personalweb.business.mappers;

import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerCountriesResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerMonthsResponse;
import com.personalweb.business.dto.responses.get.GetAllMoreCommentedPostsResponse;
import com.personalweb.business.dto.responses.get.GetAllMostCommentersResponse;
import com.personalweb.data.dto.CountryCommentsCount;
import com.personalweb.data.dto.MonthCommentsCount;
import com.personalweb.data.dto.MostCommentedPost;
import com.personalweb.data.dto.TopCommenter;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class StatisticsMapper {
    public GetAllMoreCommentedPostsResponse toGetAllMoreCommentedPostsResponse(MostCommentedPost request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllMoreCommentedPostsResponse(
                        r.id(),
                        r.title(),
                        r.commentsCount()))
                .orElse(null);
    }

    public GetAllMostCommentersResponse toGetAllMostCommentersResponse(TopCommenter request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllMostCommentersResponse(
                        r.nickname(),
                        r.commentsCount()))
                .orElse(null);
    }

    public GetAllCommentsCountPerMonthsResponse
    toGetAllCommentsCountPerMonthsResponse(MonthCommentsCount request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllCommentsCountPerMonthsResponse(
                        r.monthNumber(),
                        r.commentsCount()))
                .orElse(null);
    }

    public GetAllCommentsCountPerCountriesResponse
    toGetAllCommentsCountPerCountriesResponse(CountryCommentsCount request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllCommentsCountPerCountriesResponse(
                        r.country(),
                        r.commentsCount()))
                .orElse(null);
    }
}
