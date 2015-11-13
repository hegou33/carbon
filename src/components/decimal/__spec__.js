import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Decimal from './index';
import I18n from "i18n-js";
import Events from './../../utils/helpers/events';

describe('Decimal', () => {
  var instance;

  describe('with no options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Decimal name="total" />);
    });

    describe('initialize', () => {
      it('sets defaultValue to 0.00', () => {
        expect(instance.props.defaultValue).toEqual('0.00');
      });
    });

    describe('handleBlur using default value', () => {
      it('calls set state with the formatted value', () => {
        instance.refs.hidden.value = "9999";
        spyOn(instance, 'setState');
        instance.handleBlur();
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "9,999.00" });
      });
    });
  });

  describe('with options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Decimal name="total" value="1000000.00000" />
      );
    });

    it('sets the visibleValue state to a formatted version of the value', () => {
      expect(instance.state.visibleValue).toEqual("1,000,000.00");
    });

    describe('with alternative I18n options', () => {
      beforeEach(() => {
        I18n.translations = { en: { number: { format: {
          delimiter: ".",
          separator: ","
        } } } };

        instance = TestUtils.renderIntoDocument(
          <Decimal name="total" value="1000000.00000" />
        );
      });

      afterEach(() => {
        I18n.translations = {};
      });

      it('sets the visibleValue state to a formatted version using i18n opts', () => {
        expect(instance.state.visibleValue).toEqual("1.000.000,00");
      });
    });
  });

  describe('component methods', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Decimal name="total" value="1000.00" />
      );
    });

    afterEach(() => {
      instance = null;
    });

    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
      });

      it('re-evaluates the formatted visible value if input does not have focus', () => {
        instance.componentWillReceiveProps({ value: '1001.00' });
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: '1,001.00' });
      });

      it('does not re-evaluate the formatted visible value if input has focus', () => {
        instance.doc = {
          activeElement: instance.refs.visible
        };
        instance.componentWillReceiveProps({ value: '1001.00' });
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('emitOnChangeCallback', () => {
      beforeEach(() => {
        spyOn(instance, '_handleOnChange');
        instance.emitOnChangeCallback('100');
      });

      it('sets the hiddenField value as if it had been changed', () => {
        expect(instance.refs.hidden.value).toEqual('100');
      });

      it('calls _handleOnChange with a dummy event', () => {
        expect(instance._handleOnChange).toHaveBeenCalledWith({ target: instance.refs.hidden });
      });
    });

    describe('handleVisibleInputChange', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
        spyOn(instance, 'emitOnChangeCallback');
        TestUtils.Simulate.change(instance.refs.visible, { target: { value: "1,0,0,0.00" } });
      });

      it('calls setState with the exact visibleValue from the visible input', () => {
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "1,0,0,0.00" });
      });

      it('calls emitOnChangeCallback with a formatted hidden value', () => {
        expect(instance.emitOnChangeCallback).toHaveBeenCalledWith("1000.00");
      });
    });

    describe('handleBlur', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
        TestUtils.Simulate.blur(instance.refs.visible);
      });

      it('calls setState with the formatted visible value', () => {
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "1,000.00" });
      });
    });

    describe('inputProps', () => {
      var spy, mockEvent;

      beforeEach(() => {
        spy = jasmine.createSpy('spy');
        mockEvent = {
          preventDefault: spy
        }
      });

      it('sets the ui-decimal__input class to the input', () => {
        expect(instance.refs.visible.classList[0]).toEqual('ui-decimal__input');
      });

      it('sets value to the visible value', () => {
        expect(instance.refs.visible.value).toEqual("1,000.00");
      });

      describe('if a valid keydown occurs', () => {
        it('prevents default', () => {
          spyOn(Events, 'isValidDecimalKey').and.returnValue(true);
          TestUtils.Simulate.keyDown(instance.refs.visible, mockEvent);
          expect(spy).not.toHaveBeenCalled();
        });
      });

      describe('if an invalid keydown occurs', () => {
        it('prevents default', () => {
          spyOn(Events, 'isValidDecimalKey').and.returnValue(false);
          TestUtils.Simulate.keyDown(instance.refs.visible, mockEvent);
          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('hiddenInputProps', () => {
      it('sets type and readOnly', () => {
        expect(instance.refs.hidden.type).toEqual("hidden");
        expect(instance.refs.hidden.readOnly).toBeTruthy();
        expect(instance.refs.hidden.value).toEqual("1000.00");
        expect(instance.refs.hidden.defaultValue).toEqual("1000.00");
      });
    });
  });
});
