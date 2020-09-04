import { html, customElement, LitElement, property } from 'lit-element';
import styles from './rating-bar-css';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';

@customElement('orxe-rating-bar')
export default class OrxeRatingBar extends LitElement {

  /**
   * This is used to label the rating bar.
   * @memberof OrxeRatingBar
   */
  @property({ type: String, attribute: 'label' })
  label = "";

  /**
   * This is all the ratings passed down to this component.
   * @memberof OrxeRatingBar
   */
  @property({type: Array, attribute: 'ratings'})
  ratings = [1];

   /**
   * This is used to store the average rating calculated from all the ratings.
   * @memberof OrxeRatingBar
   */
  averageRating = 0;

   /**
   * Calculate the average rating from all the ratings.
   * @memberof OrxeRatingBar
   */
  getAverageRating(ratings) {
    const total = ratings.reduce((acc, c) => acc + c, 0);
    this.averageRating = parseFloat((total / ratings.length).toFixed(1));

    return this.averageRating;
  }

  /**
   * Render the rating bar after the average rating is calculated.
   * @memberof OrxeRatingBar
   */
  renderRatings() {
    return html `
    <div class="bar-container">
      <div class="bar" 
      style=${styleMap(this.calculateBarWidth())}
      class=${classMap({
        'bar': true,
        'track-rating-excellent': this.averageRating >= 8.5 && this.averageRating <= 10.0,
        'track-rating-great': this.averageRating >= 7.0 && this.averageRating < 8.5,
        'track-rating-average': this.averageRating >= 5.0 && this.averageRating < 7.0,
        'track-rating-poor': this.averageRating >= 3.0 && this.averageRating <= 5.0,
        'track-rating-bad': this.averageRating >= 0.0 && this.averageRating < 3.0
        })}
      ></div>
    </div>
    <div class="text">
      <div>Label</div>
      <div>${this.averageRating}</div>
    </div>
    `;
  }

  /**
   * Calculates the width of the track bar according to the average rating.
   * @memberof OrxeRatingBar
   */
  calculateBarWidth() {
    const width = ((this.averageRating) * 10).toString() + "%";

    const ratingBarStyle = {
      'width': width
    };

    return ratingBarStyle;
  }

  /**
   * Implement `render` to define a template for button element.
   */
  render() {
    this.getAverageRating(this.ratings);
    return html`
    <div class="rating-container">
      ${this.renderRatings()}
    </div>
    `;
  }

  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
