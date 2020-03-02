export default {
    displayError($toast, errorObj) {
        if (errorObj.response.data.message) {
            $toast.show(errorObj.response.data.message);
        } else {
            let errors = Object.values(errorObj.response.data);
            errors.forEach(error => $toast.show(error));
        }
    },

    nullOrVal(val) {
        if (val == 'null')
            return val * 1 || null;
        return val;
    }

}