{
  'use strict';

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;




    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');


    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');


    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);



    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  function generateTitleLinks(){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);


    titleList.innerHTML = '';

    /* for each article */

    const articles  = document.querySelectorAll(optArticleSelector);


    /* get the article id */



    for(let article of articles){
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      titleList.insertAdjacentHTML('afterbegin',linkHTML);
    }
    /* find the title element */


    /* get the title from the title element */

    /* create HTML of the link */


    /* insert link into titleList */


    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }
  generateTitleLinks();

  function generateTags(){
    /* find all articles */
    const articles  = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      titleList.optArticleTagsSelector('afterbegin',article);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = clickedElement.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + tag + '"><span>' + optArticleTagsSelector + '</span></a></li>';
        /* add generated code to html variable */
        titleList.insertAdjacentHTML('afterbegin',linkHTML);
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
    }
  }

  generateTags();

}
