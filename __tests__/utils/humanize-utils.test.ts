import { numberToWords, simplePluralize } from "@/utils/humanize-utils";
import { describe, expect, it } from "@jest/globals";

describe("numberToWords", () => {
  it("should return an empty string for undefined", () => {
    expect(numberToWords(undefined)).toBe("");
  });

  it("should return an empty string for NaN", () => {
    expect(numberToWords(NaN)).toBe("");
  });

  it("should return an empty string for null", () => {
    expect(numberToWords(null)).toBe("");
  });

  it('should return "zero" for 0', () => {
    expect(numberToWords(0)).toBe("zero");
  });

  it("should return the correct word representation for normal numbers", () => {
    // Test cases for normal numbers
    expect(numberToWords(1)).toBe("one");
    expect(numberToWords(2)).toBe("two");
    expect(numberToWords(3)).toBe("three");
    expect(numberToWords(4)).toBe("four");
    expect(numberToWords(5)).toBe("five");
    expect(numberToWords(6)).toBe("six");
    expect(numberToWords(7)).toBe("seven");
    expect(numberToWords(8)).toBe("eight");
    expect(numberToWords(9)).toBe("nine");
    expect(numberToWords(10)).toBe("ten");
    expect(numberToWords(11)).toBe("eleven");
    expect(numberToWords(12)).toBe("twelve");
    expect(numberToWords(13)).toBe("thirteen");
    expect(numberToWords(14)).toBe("fourteen");
    expect(numberToWords(15)).toBe("fifteen");
    expect(numberToWords(16)).toBe("sixteen");
    expect(numberToWords(17)).toBe("seventeen");
    expect(numberToWords(18)).toBe("eighteen");
    expect(numberToWords(19)).toBe("nineteen");
    expect(numberToWords(20)).toBe("twenty");
    expect(numberToWords(21)).toBe("twenty one");
    expect(numberToWords(30)).toBe("thirty");
    expect(numberToWords(40)).toBe("forty");
    expect(numberToWords(50)).toBe("fifty");
    expect(numberToWords(60)).toBe("sixty");
    expect(numberToWords(70)).toBe("seventy");
    expect(numberToWords(80)).toBe("eighty");
    expect(numberToWords(90)).toBe("ninety");
    expect(numberToWords(100)).toBe("one hundred");
    expect(numberToWords(101)).toBe("one hundred one");
    expect(numberToWords(110)).toBe("one hundred ten");
    expect(numberToWords(111)).toBe("one hundred eleven");
    expect(numberToWords(120)).toBe("one hundred twenty");
    expect(numberToWords(1000)).toBe("one thousand");
    expect(numberToWords(1001)).toBe("one thousand one");
    expect(numberToWords(1010)).toBe("one thousand ten");
    expect(numberToWords(1100)).toBe("one thousand one hundred");
    expect(numberToWords(10000)).toBe("ten thousand");
    expect(numberToWords(10001)).toBe("ten thousand one");
    expect(numberToWords(10010)).toBe("ten thousand ten");
    expect(numberToWords(10100)).toBe("ten thousand one hundred");
    expect(numberToWords(100000)).toBe("one hundred thousand");
    expect(numberToWords(100001)).toBe("one hundred thousand one");
    expect(numberToWords(100010)).toBe("one hundred thousand ten");
    expect(numberToWords(100100)).toBe("one hundred thousand one hundred");
    expect(numberToWords(1000000)).toBe("one million");
    expect(numberToWords(1000001)).toBe("one million one");
    expect(numberToWords(1000010)).toBe("one million ten");
    expect(numberToWords(1000100)).toBe("one million one hundred");
    expect(numberToWords(1001000)).toBe("one million one thousand");
    expect(numberToWords(10000000)).toBe("ten million");
    expect(numberToWords(100000000)).toBe("one hundred million");
    expect(numberToWords(1000000000)).toBe("one billion");
    expect(numberToWords(123456789)).toBe(
      "one hundred twenty three million four hundred fifty six thousand seven hundred eighty nine"
    );
    expect(numberToWords(987654321)).toBe(
      "nine hundred eighty seven million six hundred fifty four thousand three hundred twenty one"
    );
    expect(numberToWords(10000000000)).toBe("ten billion");
    expect(numberToWords(12345678901)).toBe(
      "twelve billion three hundred forty five million six hundred seventy eight thousand nine hundred one"
    );
    expect(numberToWords(98765432109)).toBe(
      "ninety eight billion seven hundred sixty five million four hundred thirty two thousand one hundred nine"
    );
    expect(numberToWords(100000000000)).toBe("one hundred billion");
    expect(numberToWords(123456789012)).toBe(
      "one hundred twenty three billion four hundred fifty six million seven hundred eighty nine thousand twelve"
    );
    expect(numberToWords(987654321098)).toBe(
      "nine hundred eighty seven billion six hundred fifty four million three hundred twenty one thousand ninety eight"
    );
    expect(numberToWords(1000000000000)).toBe("1,000,000,000,000");
    expect(numberToWords(1234567890123)).toBe("1,234,567,890,123");
    expect(numberToWords(9876543210987)).toBe("9,876,543,210,987");
    expect(numberToWords(10000000000000)).toBe("10,000,000,000,000");
    expect(numberToWords(12345678901234)).toBe("12,345,678,901,234");
    expect(numberToWords(98765432109876)).toBe("98,765,432,109,876");
    expect(numberToWords(100000000000000)).toBe("100,000,000,000,000");
    expect(numberToWords(123456789012345)).toBe("123,456,789,012,345");
    expect(numberToWords(987654321098765)).toBe("987,654,321,098,765");
  });
});

describe("simplePluralize", () => {
  it("should return the singular noun when count is 1", () => {
    expect(simplePluralize("apple", 1)).toBe("apple");
    expect(simplePluralize("car", 1)).toBe("car");
    expect(simplePluralize("book", 1)).toBe("book");
  });

  it("should return the plural noun when count is not 1", () => {
    expect(simplePluralize("apple", 0)).toBe("apples");
    expect(simplePluralize("car", 2)).toBe("cars");
    expect(simplePluralize("book", 5)).toBe("books");
  });

  it("should use the provided plural word when count is not 1", () => {
    expect(simplePluralize("apple", 0, { pluralWord: "fruit" })).toBe("fruit");
    expect(simplePluralize("car", 2, { pluralWord: "vehicles" })).toBe("vehicles");
    expect(simplePluralize("book", 5, { pluralWord: "books" })).toBe("books");
  });

  it("should use the provided suffix when count is not 1", () => {
    expect(simplePluralize("apple", 0, { suffix: "s" })).toBe("apples");
    expect(simplePluralize("car", 2, { suffix: "s" })).toBe("cars");
    expect(simplePluralize("book", 5, { suffix: "s" })).toBe("books");
  });

  it("should use the provided plural word and suffix when count is not 1", () => {
    expect(simplePluralize("apple", 0, { pluralWord: "fruit", suffix: "s" })).toBe("fruit");
    expect(simplePluralize("car", 2, { pluralWord: "vehicles", suffix: "es" })).toBe("vehicles");
    expect(simplePluralize("book", 5, { pluralWord: "books", suffix: "s" })).toBe("books");
  });
});
