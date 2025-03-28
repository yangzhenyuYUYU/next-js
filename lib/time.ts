export function getTime(): Date {
    return new Date();
  }
  
  export function getIsoTimestr(): string {
    return new Date().toISOString();
  }
  
  export const getTimestamp = () => {
    let time = Date.parse(new Date().toUTCString());
  
    return time / 1000;
  };
  
  export const getMillisecond = () => {
    let time = new Date().getTime();
  
    return time;
  };
  
  export const getOneYearLaterTime = () => {
    const currentDate = new Date();
    const oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(currentDate.getFullYear() + 1);
  
    return oneYearLater;
  };
  
  export const getOneYearLaterTimestr = () => {
    const oneYearLater = getOneYearLaterTime();
  
    return oneYearLater.toISOString();
  };
  