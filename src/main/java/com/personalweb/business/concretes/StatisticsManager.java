package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.StatisticsService;
import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerCountriesResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerMonthsResponse;
import com.personalweb.business.dto.responses.get.GetAllMoreCommentedPostsResponse;
import com.personalweb.business.dto.responses.get.GetAllMostCommentersResponse;
import com.personalweb.business.mappers.StatisticsMapper;
import com.personalweb.data.dto.MostCommentedPost;
import com.personalweb.data.dto.TopCommenter;
import com.personalweb.data.repository.CommentRepository;
import com.personalweb.data.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StatisticsManager implements StatisticsService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final StatisticsMapper statisticsMapper;

    @Override
    public Page<GetAllMoreCommentedPostsResponse> getMoreCommentedPosts(Pageable pageable) {
        Page<MostCommentedPost> postPage = postRepository.findAllPublicOrderByCommentsCountDesc(pageable);
        List<GetAllMoreCommentedPostsResponse> postDtoList = postPage
                .stream()
                .map(statisticsMapper::toGetAllMoreCommentedPostsResponse)
                .toList();
        return new PageImpl<>(postDtoList, pageable, postPage.getTotalElements());
    }

    @Override
    public Page<GetAllMostCommentersResponse> getMostCommenters(Pageable pageable) {
        List<TopCommenter> topCommenterPage =
                commentRepository.findPublicTopCommentersOrderByCountDesc(pageable);
        List<GetAllMostCommentersResponse> dtoList = topCommenterPage
                .stream()
                .map(statisticsMapper::toGetAllMostCommentersResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(dtoList, pageable, topCommenterPage.size());
    }

    @Override
    public List<GetAllCommentsCountPerMonthsResponse> getCommentsCountPerMonth() {
        return commentRepository.findPublicMonthCommentsCountOrderByMonthAsc()
                .stream()
                .map(statisticsMapper::toGetAllCommentsCountPerMonthsResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<GetAllCommentsCountPerCountriesResponse> getCommentsCountPerCountry() {
        return commentRepository.findPublicCountryCommentsCountOrderByCountDesc()
                .stream()
                .map(statisticsMapper::toGetAllCommentsCountPerCountriesResponse)
                .collect(Collectors.toList());
    }
}
