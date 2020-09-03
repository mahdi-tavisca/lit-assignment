import { html, customElement, LitElement, property } from 'lit-element';
import styles from './rating-bar-css';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';

@customElement('orxe-rating-bar')
export default class OrxeRatingBar extends LitElement {

  @property({ type: String, attribute: 'label' })
  label = "";

  @property({type: Array, attribute: 'ratings'})
  ratings = [3, 2, 5];

  _averageRating = 0;

  _getAverageRating(ratings) {
    const total = ratings.reduce((acc, c) => acc + c, 0);
    this._averageRating = parseFloat((total / ratings.length).toFixed(1));

    return this._averageRating;
  }

  _renderRatings() {
    return html `
    <div class="bar-container">
      <div class="bar" 
      style=${styleMap(this._calculateBarWidth())}
      class=${classMap({
        'bar': true,
        'track-rating-excellent': this._averageRating >= 8.5 && this._averageRating <= 10.0,
        'track-rating-great': this._averageRating >= 7.0 && this._averageRating < 8.5,
        'track-rating-average': this._averageRating >= 5.0 && this._averageRating < 7.0,
        'track-rating-poor': this._averageRating >= 3.0 && this._averageRating <= 5.0,
        'track-rating-bad': this._averageRating >= 0.0 && this._averageRating < 3.0
        })}
      ></div>
    </div>
    <div class="text">
      <div>Label</div>
      <div>${this._averageRating}</div>
    </div>
    `;
  }

  _calculateBarWidth() {
    const width = ((this._averageRating) * 10).toString() + "%";

    const ratingBarStyle = {
      'width': width
    };

    return ratingBarStyle;
  }

  /**
   * Implement `render` to define a template for button element.
   */
  render() {
    this._getAverageRating(this.ratings);
    return html`
    <div class="rating-container">
      ${this._renderRatings()}
    </div>
    `;
  }

  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
