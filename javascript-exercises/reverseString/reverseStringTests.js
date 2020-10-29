var stringToReverse = 'test';

describe("ReverseString", function(){

    it("should reverse a variety of strings", function(){
        expect("simple").toBe(reverseString.reverse('elpmis'));
        expect("craM").toBe(reverseString.reverse('Marc'));
        expect(" C ").toBe(reverseString.reverse(' C '));
        expect("  A").toBe(reverseString.reverse('A  '));
    });

    it("should throw an exception with the input is falsey", function(){
        expect(function(){reverseString.reverse('')}).toThrow(new Error('Cannot reverse empty string'));
        expect(function(){reverseString.reverse(null)}).toThrow(new Error('Cannot reverse empty string'));
        expect(function(){reverseString.reverse(0)}).toThrow(new Error('Cannot reverse empty string'));
    });

    it("should throw an exception with the input is not a string", function(){
        expect(function(){reverseString.reverse([])}).toThrow(new Error('Cannot reverse non-string'));
    });
});