/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
describe('home section', function () {
    beforeEach(module('calorific.home'));
    it('should have a dummy test', inject(function() {
        expect(true).toBeTruthy();
    }));
});

// Food service tests
describe('Food check service via HTTP', function () {
    var httpBackend,
        service;
    beforeEach(function () {
        module('calorific');

        inject(function ($httpBackend, Foods) {
            httpBackend = $httpBackend;
            service = Foods;
        });
    });
    beforeEach(inject(function($injector) {
        this.addMatchers({
            tobeArray: function (returned) {
                return Array.isArray(this.actual);
            }
        });
        createService = function() {
            return $injector.get('Foods');        
        };
    }));

    // Run tests gere
    it('Should return an array of macro data.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/summary').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.summaryItems().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of food data.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/foodlist').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.list().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of foods for the day.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/todaysfoods').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.todaysFoods().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of macro data after bulking change.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/changebulk').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.changeBulk().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of day data in array.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/changeworkout').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.changeWorkout().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of todays foods with new food added.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/addnewfood').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.addNewFood().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).toBeTruthy();
    });
    it('Should return an array of todays foods with food added.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/addfood').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.addFood().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an object after changing date.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/changedate').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.changeDate().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).toBeTruthy();
    });
    it('Should return the date the summary has been set to start from.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/changesummarydate').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.changeSummaryDate().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of foods with one item removed.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/removefood').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.removeFood().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of dates and foods for a diary.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/fooddiary').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.foodDiary().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of todays macro figures data.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/todaysmacros').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.todaysMacros().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of macro guideline data .', function () {
        httpBackend.expectPOST('http://homestead.app/v1/getmacros').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.getMacros().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    it('Should return an array of changed macro guideline data.', function () {
        httpBackend.expectPOST('http://homestead.app/v1/changemacros').respond({
            data: {
                dataitem: [{}]
                }
        });
        var result;
        service.setMacros().then(function (response) {
            result = response;
        });
        httpBackend.flush();
        expect(result.data).tobeArray();
    });
    
    

});

describe('Food check service without HTTP', function () {
    var service;
    beforeEach(function () {
        module('calorific');

        inject(function (Foods) {
            service = Foods;
        });
    });
    beforeEach(inject(function($injector) {
        this.addMatchers({
            tobeArray: function (returned) {
                return Array.isArray(this.actual);
            }
        });
        createService = function() {
            return $injector.get('Foods');        
        };
    }));

    // Run tests here: 
    it('Should be logged out.', function () {
        var result;
        result = service.testo();   
        expect(result).toBeTruthy();
    });
});
