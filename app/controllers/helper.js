'use strict'


module.exports = {
    moduloDez: moduloDez,
    moduloOnze: moduloOnze
};

/***
 * Returns modulo 10 verification digit
 * @param codigo
 * @returns {string|null}
 */
function moduloDez(codigo) {
    try {
        let mult = 2;
        let sum = 0;
        let dv = 0;

        for (let i = codigo.length - 1; i >= 0; i--) {

            let digit = parseInt(codigo.charAt(i), 10);
            let product = 0;

            if (isNaN(digit)) {
                digit = 0
            }

            product = digit * mult;
            if (product >= 10) {
                product = product - 9
            }

            sum += product

            if (mult == 2) {
                mult = 1
            } else {
                mult = 2
            }

        }

        dv = sum % 10;
        if (dv != 0) {
            dv = 10 - dv
        }

        return dv.toString()


    } catch (err) {
        console.log("Codigo: " + codigo);
        console.log("Modulo 10 error " + err.name + " - " + err.message);
        return null
    }

}

/***
 * Returns modulo 11 verification digit
 * @param codigo
 * @returns {string|null}
 */
function moduloOnze(codigo) {
    try {
        let mult = 2;
        let sum = 0;
        let dv = 0;

        for (let i = codigo.length - 1; i >= 0; i--) {

            let digit = parseInt(codigo.charAt(i), 10);
            let product = 0;

            product = digit * mult;
            sum += product

            if (mult < 9) {
                mult++;
            } else {
                mult = 2
            }

        }

        dv = sum % 11
        if (dv < 2) {
            dv = 1
        } else {
          dv = 11 - dv
        }

        return dv.toString()


    } catch (err) {
        console.log("Codigo: " + codigo);
        console.log("Modulo 11 error " + err.name + " - " + err.message);
        return null
    }

}