import ValidationsHelper from './../../helpers/validations';

/**
 * A Length Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import LengthValidator from 'utils/validations/length'`
 *
 * Assign the validator to the validations prop, passing the required params:
 *
 * By default, the validator sets the input type to 'text', you can set this to 'numeral',
 * in order to change the i18n message returned.
 *
 * To validate a number is a specific length, pass { type: 'numeral', is: 100} :
 *
 * To validate that a length not be lesser or greater than a value set a 'max' or 'min'.
 *
 *  e.g.
 *
 *  `<TextArea validations={ [new LengthValidator({ min: 8 })] }/>`
 *
 * would validate that a text field be at least 8 characters long.
 *
 * To validate a length is within a given range, set both a min and max.
 *
 * Examples:
 *
 * // length is greater than or equal to 8:
 * new LengthValidator({ min: 8 });
 *
 * // length is less than or equal to 8:
 * new LengthValidator({ max: 8 });
 *
 * // length is between 5 and 10 characters:
 * new LengthValidator({ min: 5, max: 10 });
 *
 * // length is 10 characters:
 * new LengthValidator({ is: 10 });
 *
 * @constructor LengthValidator
 */
class LengthValidator {

  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    let validationToCall, lengthFunctions, validationObject;

    validationToCall = 'validate' + getType(params);

    lengthFunctions = {
      validateGreater: validateGreater(),
      validateExact:   validateLength(),
      validateLess:    validateLess(),
      validateRange:   validateRange()
    };

    validationObject = lengthFunctions[validationToCall];

    /**
     * Custom message for validation.
     *
     * @property customMessage
     * @type {String}
     */
    this.customMessage = params.customMessage;

    /**
     * Min length value.
     *
     * @property min
     * @type {Number}
     */
    this.min = params.min;

    /**
     * Max length value.
     *
     * @property max
     * @type {Number}
     */
    this.max = params.max;

    /**
     * An exact match.
     *
     * @property is
     * @type {Number}
     */
    this.is = params.is;

    /**
     * Can either be 'text' or 'numeral'.
     *
     * @property type
     * @type {String}
     */
    this.type = params.type || 'text';

    /**
     * @property validate
     * @type {Function}
     */
    this.validate = validationObject.validate;

    /**
     * @property message
     * @type {Function}
     */
    this.message = validationObject.message;
  }
}

export default LengthValidator;


// Private Methods

/**
 * Returns validation type based on param
 *
 * @method getType
 * @return {String} validation to call
 * @private
 */
function getType(params) {
  let type = ValidationsHelper.comparisonType(params);

  if (!type) {
    throw new Error("You must either set an 'is' value, a single 'min' and 'max' value, or both a 'min' and 'max' value.");
  }

  return type;
}

/**
 * This will validate whether the value matches the specified length.
 *
 * @method validateLength
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateLength() {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length == this.is));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        this.customMessage,
        `validations.length.${this.type}`,
        { is: this.is }
      );
    }
  };
}

/**
 * This will validate whether the value is less than or equal to a maximum value.
 *
 * @method validateLess
 * @return {Function} validateLess
 * @return {Function} message
 * @private
 */
function validateLess() {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length <= this.max));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        this.customMessage,
        `validations.length_less_than_or_equal.${this.type}`,
        { max: this.max }
      );
    }
  };
}

/**
 * This will validate whether the value is greater than or equal to a minimum value.
 *
 * @method validateGreater
 * @return {Function} validateGreater
 * @return {Function} message
 * @private
 */
function validateGreater() {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length >= this.min));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        this.customMessage,
        `validations.length_greater_than_or_equal.${this.type}`,
        { min: this.min }
      );
    }
  };
}

/**
 * This will validate whether the value is between a given range,
 * inclusive of the min and max.
 *
 * @method validateRange
 * @return {Function} validateRange
 * @return {Function} message
 * @private
 */
function validateRange() {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length >= this.min && value.length <= this.max));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        this.customMessage,
        `validations.length_range.${this.type}`,
        { min: this.min, max: this.max }
      );
    }
  };
}
