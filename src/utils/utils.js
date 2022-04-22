
export default class {
    
    // formating numbers to currency like format
    static formatToNumber = num => {
        return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(".00", "");
    }
}