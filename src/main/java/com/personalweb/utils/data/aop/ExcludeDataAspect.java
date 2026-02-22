//package com.personalweb.utils.data.aop;
//
//import com.personalweb.data.entities.Category;
//import com.personalweb.data.entities.Post;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//import org.aspectj.lang.annotation.Pointcut;
//import org.hibernate.Session;
//import org.springframework.security.authentication.AnonymousAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class ExcludeDataAspect {
//    @PersistenceContext
//    public EntityManager entityManager;
//
//    @Pointcut("execution(* org.springframework.data.repository.Repository+.*(..))")
//    void isRepository() {
//        /* aspect */
//    }
//
//    @Before("isRepository()")
//    public void beforeExecution(JoinPoint joinPoint) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || !authentication.isAuthenticated() ||
//                authentication instanceof AnonymousAuthenticationToken) {
//            Session session = entityManager.unwrap(Session.class);
//
//            session.enableFilter(Category.NAME_FILTER_NAME)
//                    .setParameter(Category.NAME_FILTER_ARGUMENT_NAME, Category.PRIVATE);
//            session.enableFilter(Post.CATEGORY_NAME_FILTER_NAME)
//                    .setParameter(Category.NAME_FILTER_ARGUMENT_NAME, Category.PRIVATE);
//        }
//    }
//}
