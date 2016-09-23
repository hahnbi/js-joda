/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
 */

import {expect} from 'chai';
import {assertEquals} from './testUtils';

import './_init';

import {ChronoField} from '../src/temporal/ChronoField';
import {DayOfWeek} from '../src/DayOfWeek';
import {IllegalArgumentException, UnsupportedTemporalTypeException} from '../src/errors';
import {TemporalAccessor} from '../src/temporal/TemporalAccessor';
import {TemporalField} from '../src/temporal/TemporalField';
import {TemporalQuery} from '../src/temporal/TemporalQuery';
import {ValueRange} from '../src/temporal/ValueRange';

/* these are not covered by the threetenbp ported tests */
describe('js-joda DayOfWeek', () => {
    describe('from', () => {
        
        it('should return the same DayOfWeek it has been called with', () => {
            let dayOfWeek = new DayOfWeek(0, 'TEST');
            let newDayOfWeek = DayOfWeek.from(dayOfWeek);
            expect(newDayOfWeek).to.equal(dayOfWeek);
        });
        
        it('should rethrow an exception thrown by Temporal.get', () => {
            let t = new TemporalAccessor();
            t.get = () => {
                throw new Error('Test Error');
            };
            expect(() => {
                DayOfWeek.from(t);
            }).to.throw(Error, /Test Error/);
        });
    });
    
    describe('getDisplayName', () => {
        
        it('should throw an IllegalArgumentException', () => {
            expect(() => {
                DayOfWeek.MONDAY.getDisplayName();
            }).to.throw(IllegalArgumentException);
        });
        
    });
    
    describe('isSupported', () => {
        
        it('should return true for supported ChronoFields', () => {
            let dayOfWeek = DayOfWeek.MONDAY;
            expect(dayOfWeek.isSupported(ChronoField.DAY_OF_WEEK)).to.be.true;
        });
        
        it('should return false for unsupported ChronoFields', () => {
            let dayOfWeek = DayOfWeek.MONDAY;
            expect(dayOfWeek.isSupported(ChronoField.DAY_OF_MONTH)).to.be.false;
            expect(dayOfWeek.isSupported(ChronoField.DAY_OF_YEAR)).to.be.false;
            expect(dayOfWeek.isSupported(null)).to.be.false;
        });
        
        it('should return corresponding value of isSupportedBy for TemporalFields', () => {
            let dayOfWeek = DayOfWeek.MONDAY;
            let field = new TemporalField();
            field.isSupportedBy = () => {
                return false;
            };
            expect(dayOfWeek.isSupported(field)).to.be.false;
            field = new TemporalField();
            field.isSupportedBy = () => {
                return true;
            };
            expect(dayOfWeek.isSupported(field)).to.be.true;
        });
    });
    
    describe('range', () => {
        it('should return the range of DAY_OF_WEEK', () => {
            assertEquals(DayOfWeek.MONDAY.range(ChronoField.DAY_OF_WEEK), ChronoField.DAY_OF_WEEK.range());
        });
        
        it('should return corresponding value of rangeRefindeBy for TemporalField', () => {
            let field = new TemporalField();
            field.rangeRefinedBy = () => {
                return 'Test Value';
            };
            expect(DayOfWeek.MONDAY.range(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                DayOfWeek.MONDAY.range(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('getLong', () => {
        it('should return corresponding value of getFrom for TemporalField', () => {
            let field = new TemporalField();
            field.getFrom = () => {
                return 'Test Value';
            };
            expect(DayOfWeek.MONDAY.getLong(field)).to.eql('Test Value');
        });
        
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                DayOfWeek.MONDAY.getLong(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
        
    });
    
    describe('get', () => {
        it('should return corresponding value of getFrom for TemporalField', () => {
            let field = new TemporalField();
            field.rangeRefinedBy = () => {
                return ValueRange.of(1234, 1234);
            };
            field.getFrom = () => {
                return 1234;
            };
            expect(DayOfWeek.MONDAY.get(field)).to.eql(1234);
        });
    
        it('should throw exception for unsupported ChronoFields', () => {
            expect(() => {
                DayOfWeek.MONDAY.get(ChronoField.DAY_OF_MONTH);
            }).to.throw(UnsupportedTemporalTypeException);
        });
    
    });
    
    describe('query', () => {
        
        it('should return corresponding value of queryFrom for TemporalQuery', () => {
            let test = DayOfWeek.MONDAY;
            let query = new TemporalQuery();
            query.queryFrom = () => {
                return 'Test Value';
            };
            expect(test.query(query)).to.eql('Test Value');
        });
    });

    describe('DayOfWeek.FROM', () => {
    
        it('should return the same DayOfWeek it has been called with', () => {
            let dayOfWeek = new DayOfWeek(0, 'TEST');
            let newDayOfWeek = DayOfWeek.FROM.queryFrom(dayOfWeek);
            expect(newDayOfWeek).to.equal(dayOfWeek);
        });
    
    });
    
});