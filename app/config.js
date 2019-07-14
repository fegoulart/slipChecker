module.exports = function () {

    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                'boletoBaseDate': 876189600000, // 07-oct-1997
                'wrongTypeMsg': 'Wrong type',
                'httpInvalidInput': 400,
                'httpOk': 200,
                'boletoOkMsg': 'Boleto successfully verified',
                'tituloOkMsg': 'Titulo successfully verified',
                'noDataInformedMsg': 'No data informed',
                'httpServerError': 500,
                'config.couldNotVerifyMsg': 'Could not verify typed data',
                'boletoSlipType': 'boleto',
                'tituloSlipType': 'titulo',
                'boletoLenght': 57,
                'tituloLenght': 48,
                'invalidDataMsg': 'Invalid data'
            };
        case 'production':
            return {
                'boletoBaseDate': 876189600000, // 07-oct-1997
                'wrongTypeMsg': 'Wrong type',
                'httpInvalidInput': 400,
                'httpOk': 200,
                'boletoOkMsg': 'Boleto successfully verified',
                'tituloOkMsg': 'Titulo successfully verified',
                'noDataInformedMsg': 'No data informed',
                'httpServerError': 500,
                'config.couldNotVerifyMsg': 'Could not verify typed data',
                'boletoSlipType': 'boleto',
                'tituloSlipType': 'titulo',
                'boletoLenght': 57,
                'tituloLenght': 48,
                'invalidDataMsg': 'Invalid data'
            };
        default:
            return {
                'boletoBaseDate': 876189600000, // 07-oct-1997
                'wrongTypeMsg': 'Wrong type',
                'httpInvalidInput': 400,
                'httpOk': 200,
                'boletoOkMsg': 'Boleto successfully verified',
                'tituloOkMsg': 'Titulo successfully verified',
                'noDataInformedMsg': 'No data informed',
                'httpServerError': 500,
                'config.couldNotVerifyMsg': 'Could not verify typed data',
                'boletoSlipType': 'boleto',
                'tituloSlipType': 'titulo',
                'boletoLenght': 57,
                'tituloLenght': 48,
                'invalidDataMsg': 'Invalid data'
            }
    }
};