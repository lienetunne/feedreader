/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // This suite is all about the RSS feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.*/
        it('allFeeds variable has been defined and its not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
     // Test for checking if each allFeeds object has a URL defined and its not empty
         it('ULR is defined and is not empty', function(){
           allFeeds.forEach(function(feed){
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           })
         });
     // Test for checking if each allFeeds object has a name defined and its not epmty
         it('name is defined and is not empty', function(){
           allFeeds.forEach(function(feedName){
             expect(feedName.name).toBeDefined();
             expect(feedName.name.length).not.toBe(0);
           })
         });
    });

    // New test suite, it's all about the menu element
    describe('The menu',function(){
        // Test for checking if the menu elemnt is hidden by default
             var body =document.body;
             var iconLink = document.querySelector('.menu-icon-link');
             it('element is hidden by default', function(){
               expect($('body').hasClass('menu-hidden')).toBe(true);
             });
         // Test for checking if the menu appears when clicked and disappears when clicked
             it('appears when clicked and disappears when clicked',function(){
                 iconLink.click();
                 expect($(body).hasClass('menu-hidden')).toBe(false);
                 iconLink.click();
                 expect($(body).hasClass('menu-hidden')).toBe(true);
              });

    });
     // New test suite about Initial Entries
    describe('Initial Entries',function(){
       // looping through async + async done() function
             beforeEach(function(done){
               loadFeed(0, done);
             });
         // Test for checking if loadfeed funtion completes its work and theres at least a singe entry emelent
             it('Loadfeed function completes its work and theres at least a single .entry element',function(){
               var feedContainer = document.querySelector('.feed');
               var containsEntries = feedContainer.getElementsByClassName('entry-link').length;
               expect(containsEntries).toBeGreaterThan(0);
              });
    });
    // New test suite for New Fenn selection
    describe('New Feed Selection', function(){

             var feedInnerHtml;
            //beforEach function for async
             beforeEach(function(done){
               loadFeed(0, function(){
                feedInnerHtml = document.querySelector('.feed').innerHTML;
                 loadFeed(1,function(){
                   done();
                 })
               });
             });
        // test for checking if Inner feed content changes
             it('Inner feed content changes', function(done){
               var differentFeedInnerHtml = document.querySelector('.feed').innerHTML;
               expect(differentFeedInnerHtml).not.toBe(feedInnerHtml);
               done();
             });
    });
}());
