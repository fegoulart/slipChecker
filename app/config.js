module.exports = function () {

    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                'tituloBaseDate' : '10/07/1997', // 07-oct-1997
                'wrongTypeMsg': 'Wrong type.',
                'httpInvalidInput': 400,
                'httpOk': 200,
                'tituloOkMsg': 'Titulo successfully verified.',
                'convenioOkMsg': 'Convenio successfully verified.',
                'noDataInformedMsg': 'No data informed.',
                'httpServerError': 500,
                'config.couldNotVerifyMsg': 'Could not verify typed data.',
                'tituloSlipType': 'titulo',
                'convenioSlipType': 'convenio',
                'tituloLength': 47,
                'convenioLength': 48,
                'invalidDataMsg': 'Invalid data.',
                'couldNotReadTituloMsg': 'Could not read titulo.',
                'couldNotReadConvenioMsg' : 'Could not read convenio.',
                'couldNotPingMsg' : 'Mayday ! Mayday ! Mayday ! Could not ping.',
                'invalidBankMsg' : 'Invalid bank code.',
                'invalidCurrencyMsg' : 'Invalid currency code.',
                'invalidField1Msg' : 'Invalid field1.',
                'invalidField2Msg' : 'Invalid field2.',
                'invalidField3Msg' : 'Invalid field3.',
                'invalidField4Msg' : 'Invalid field4.',
                'invalidProductMsg': 'Invalid product.',
                'invalidSegmentMsg': 'Invalid segment.',
                'invalidRealValueMsg' : 'Invalid real or reference amount Id.'
            };
        case 'production':
            return {
                'tituloBaseDate' : '10/07/1997', // 07-oct-1997
                'wrongTypeMsg': 'Wrong type.',
                'httpInvalidInput': 400,
                'httpOk': 200,
                'tituloOkMsg': 'Titulo successfully verified.',
                'convenioOkMsg': 'Convenio successfully verified.',
                'noDataInformedMsg': 'No data informed.',
                'httpServerError': 500,
                'config.couldNotVerifyMsg': 'Could not verify typed data.',
                'tituloSlipType': 'titulo',
                'convenioSlipType': 'convenio',
                'tituloLength': 47,
                'convenioLength': 48,
                'invalidDataMsg': 'Invalid data.',
                'couldNotReadTituloMsg': 'Could not read titulo.',
                'couldNotReadConvenioMsg' : 'Could not read convenio.',
                'couldNotPingMsg' : 'Mayday ! Mayday ! Mayday ! Could not ping.',
                'invalidBankMsg' : 'Invalid bank code.',
                'invalidCurrencyMsg' : 'Invalid currency code.',
                'invalidField1Msg' : 'Invalid field1.',
                'invalidField2Msg' : 'Invalid field2.',
                'invalidField3Msg' : 'Invalid field3.',
                'invalidField4Msg' : 'Invalid field4.',
                'invalidProductMsg': 'Invalid product.',
                'invalidSegmentMsg': 'Invalid segment.',
                'invalidRealValueMsg' : 'Invalid real or reference amount Id.'
            };
        default:
            return {
                'tituloBaseDate' : '10/07/1997', // 07-oct-1997
                'wrongTypeMsg': 'Wrong type.',
                'httpInvalidInput': 400,
                'httpOk': 200,
                'tituloOkMsg': 'Titulo successfully verified.',
                'convenioOkMsg': 'Convenio successfully verified.',
                'noDataInformedMsg': 'No data informed.',
                'httpServerError': 500,
                'config.couldNotVerifyMsg': 'Could not verify typed data.',
                'tituloSlipType': 'titulo',
                'convenioSlipType': 'convenio',
                'tituloLength': 47,
                'convenioLength': 48,
                'invalidDataMsg': 'Invalid data.',
                'couldNotReadTituloMsg': 'Could not read titulo.',
                'couldNotReadConvenioMsg' : 'Could not read convenio.',
                'couldNotPingMsg' : 'Mayday ! Mayday ! Mayday ! Could not ping.',
                'invalidBankMsg' : 'Invalid bank code.',
                'invalidCurrencyMsg' : 'Invalid currency code.',
                'invalidField1Msg' : 'Invalid field1.',
                'invalidField2Msg' : 'Invalid field2.',
                'invalidField3Msg' : 'Invalid field3.',
                'invalidField4Msg' : 'Invalid field4.',
                'invalidProductMsg': 'Invalid product.',
                'invalidSegmentMsg': 'Invalid segment.',
                'invalidRealValueMsg' : 'Invalid real or reference amount Id.'
            }
    }
};