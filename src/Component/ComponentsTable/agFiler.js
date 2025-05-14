import moment from "moment/moment";

const DatefilterParams = {
    
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        let call = moment(cellValue).format('DD-MM-YYYY');
        let dateAsString = call;
        if (dateAsString == null) return -1;
        let dateParts = dateAsString.split('-');
        let cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
   
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
        return 0;
      },
      
      inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
  };
  
  export default DatefilterParams;