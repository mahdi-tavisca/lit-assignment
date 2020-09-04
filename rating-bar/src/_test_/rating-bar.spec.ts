import { OrxeRatingBar } from '../';


describe('orxe-rating-bar', () => {
  let orxeRatingBar: OrxeRatingBar;

  beforeEach(async function() {
    OrxeRatingBar;
    orxeRatingBar = (await document.createElement(
      "orxe-rating-bar"
    )) as OrxeRatingBar;

    orxeRatingBar.label = "";
    orxeRatingBar.ratings = [1];
    orxeRatingBar.averageRating = 0;
    document.body.appendChild(orxeRatingBar);
  });

  afterEach(function() {
    orxeRatingBar.remove();
  });

  it("should be defined", () => {
    expect(orxeRatingBar).toBeDefined();
  });

  it("should contain a rating array", () => {
    expect(orxeRatingBar.ratings).toHaveLength(1);
  });

  it("should calculate the correct average rating from an array of ratings", () => {
    orxeRatingBar.ratings = [3, 4, 8];
    orxeRatingBar.getAverageRating(orxeRatingBar.ratings);

    expect(orxeRatingBar.averageRating).toEqual(5);
  });

  it("should calculate the correct bar width from the average rating and return a css style", () => {
    orxeRatingBar.ratings = [1];
    orxeRatingBar.getAverageRating(orxeRatingBar.ratings);

    expect(orxeRatingBar.calculateBarWidth()).toHaveProperty('width', '10%');
  });
});