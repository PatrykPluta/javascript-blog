{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authors: Handlebars.compile(document.querySelector('#template-authors').innerHTML),
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optAuthorsListSelector = '.list.authors',
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;




    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(customSelector)
    /* get the article id */
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
      titleList.insertAdjacentHTML('afterbegin', linkHTML);
    }
    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }
  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = { 'max': 0, 'min': 999999 };
    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      } if (tags[tag] < params.min) {
        params.min = tags[tag];
      }

    }

    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return 'tag-size-' + classNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    const allTags = {};
    const allTagsData = { tags: [] };

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.articleTag(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTagsData[tag], tagsParams) + '"> ' + tag + '</a></li>';
      //console.log('tagLinkHTML:', tagLinkHTML);
      const linkHTMLData = { id: tag, title: calculateTagClass(allTags[tag], tagsParams) };
      const linkHTML = templates.tagCloudLink(linkHTMLData);
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData)
  };

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href ^= "#tag-"]')
    /* START LOOP: for each active tag link */
    for (let link of tagLinks) {
      /* remove class active */
      link.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagHref = document.querySelectorAll('a[href="' + href + '"]')
    /* START LOOP: for each found tag link */
    for (let link of tagHref) {
      /* add class active */
      link.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag"]')
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function generateAuthors() {
    /* find all aricles */
    const articles = document.querySelectorAll(optArticleSelector);

    const allAuthors = [];
    const authorsList = document.querySelector(optAuthorsListSelector)

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const author = article.querySelector(optArticleAuthorSelector);
      console.log(author)
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor)
      /* generate HTML of the link */
      //const linkHTML = '<a href="#-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const linkHTML = templates.articleAuthor(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* insert HTML of all the links into the tags wrapper */
      author.innerHTML = html;
      /* END LOOP: for every article: */

      if(!allAuthors.includes(articleAuthor)) {
        allAuthors.push(articleAuthor);
      }
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    console.log(allAuthors)
    authorsList.innerHTML = templates.authors({ authors: allAuthors });
  };

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const authorname = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = authorname.replace('#author-', '');
    /* find all tag links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author"]')
    /* START LOOP: for each active tag link */
    for (let link of authorLinks) {
      /* remove class active */
      link.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorHref = document.querySelectorAll('a[author="' + authorname + '"]')
    /* START LOOP: for each found tag link */
    for (let link of authorHref) {
      /* add class active */
      link.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthor() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#author"]')
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthor();
}
