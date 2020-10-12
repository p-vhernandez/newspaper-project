###### We will describe the functional requirements of the web interface of the newspaper application.
**Main page**
- The main page must show the list of articles retrieved form the server **- DONE**
- Every article in the main page must include: their title, subtitle, thumbnail of the article image (if
exists) and their abstract. The body of the article is not shown in the main page and it will be
shown in the article detail page. **- DONE**
- The article title and the article image must navigate to the details page of the corresponding 
article. Article edition is not allowed by means of this links. **- DONE**
- If the user is logged in, the following buttons must appear:
  - A button for each article to edit them redirecting the user to the edition form. **- BUTTON SHOWN - FUNCTIONALITY MISSING**
  - A button to create a new article which redirects to an empty article edition form.
  - A button for each article to remove it. **- BUTTON SHOWN - FUNCTIONALITY MISSING**
- Article removal requires the confirmation of the user before applying the removal.
- Article removal must give some feedback to the user with the result of the operation.

**Login form**
- A login form (username and password) and a button for log in must be shown in the main page of
the application **- DONE**
- If the user introduces the correct username and password, the form must be replaced by
the name of the user (e.g. “Hello xxxx”) and a logout button must be shown **- DONE**
- If the username or password are incorrect, a message with this information must be
shown

**Navigation bar of the main page**
- The navigation bar must show all buttons/links for all categories shown in the newspaper, that is,
National, Economy, Sports, Technology and All.
- Links/buttons in the navigation bar must filter the articles shown in the main page according to
the selected category.
- The navigation bar includes a text field to add some text that will be used to filter the articles
shown in the main page of the newspaper.
- If the user is logged in, articles can be created, edited and removed. Otherwise, the user cannot
edit the article contents.
- The navigation bar should be properly shown in mobile devices. Ideally, it should be collapsed in
one button for small devices.

**Article details page**
- The article details must be shown with its title, subtitle, abstract, category, body and picture (if it is
included in the article). **- DONE**
- The modification date and the username who have modified the content must be shown at the
end of the details page.
- Articles cannot be modified in the details view **- DONE**
- As the article body is written in HTML, its content must be properly shown by the application **- MUST BE REVIEWED. NOW WE "CLEAN" ABSTRACT AND BODY TO GET RID OF HTML TAGS**

**Article edition and creation**
- The form must include all input to edit/create the article, that is: title, subtitle, abstract, body and
image selection.
- The categories must be selected in a combo with values: National, Economy, Sports and
Technology.
- Body can be fill in HTML format (a WYSIWYG editor can be used).
- All inputs of the form (except the image) are mandatory and the form must be validated.
- This form must include a button to come back to the main page and another button to save/create
the form information added by the user.
- Saving information must give some feedback to the user with the result of the operation

**Other tasks**
- When the user is logged in, show the "welcome, xxxx" message next to the "log out" button.
- When the user logs out, we have to figure out how to reload the page content in order to:
  - Change the "log out" button for the "log in" one. 
  - Unshow the "welcome, xxxx" message
  - Unshow the edit and delete buttons from the articles.
