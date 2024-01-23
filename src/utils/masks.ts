export const maskNumber = (e: React.ChangeEvent<HTMLInputElement>, trimedValue: string, prevValue: string) => {
  if (!trimedValue) return e.target.value = "";
  if (e.target.value.length != e.target.selectionStart) {
    let selection = e.target.selectionStart? e.target.selectionStart-1 : 0;
    let pasted = e.target.value.slice(selection, selection + 1);
    console.log(pasted);
    
    
    if (/\D/g.test(pasted) && trimedValue == prevValue) {
      e.target.value = trimedValue;
    }

    return;
  }
  
  let maskedInputValue = '';

  if (["7", "8", "9"].includes(trimedValue[0])) {
    maskedInputValue = (trimedValue[0] == "9") ? `+ 7 (9` : `+ ${trimedValue[0]}`;

    if (trimedValue.length > 1) {
      maskedInputValue += ` (${trimedValue.substring(1, 4)}`; 
    }
    if (trimedValue.length >= 5) {
      maskedInputValue += `) ${trimedValue.substring(4, 7)}`; 
    }
    if (trimedValue.length >= 8) {
      maskedInputValue += `-${trimedValue.substring(7, 9)}`; 
    }
    if (trimedValue.length >= 10) {
      maskedInputValue += `-${trimedValue.substring(9, 11)}`; 
    }
  } else {
    maskedInputValue = "+ " + trimedValue;
  }

  e.target.value = maskedInputValue;
}


export const maskMoney = (e: React.ChangeEvent<HTMLInputElement>, trimedValue: string, prevValue: string) => {
  if (!trimedValue) return e.target.value = "";
  if (trimedValue.split('.').length > 2) {
    e.target.value = `${parseFloat(trimedValue).toFixed(2)} руб.`;
    return;
  }
  if (e.target.selectionStart != null && trimedValue.length > e.target.selectionStart) {
    let selection = e.target.selectionStart? e.target.selectionStart -1 : 0;
    let pasted = e.target.value.slice(selection, selection + 1);
    console.log(pasted);
    
    if (/[^\d\.\,]/g.test(pasted)) {
      e.target.value = trimedValue;
    }

    return;
  }
  
  let maskedInputValue = '';

  maskedInputValue = trimedValue;

  e.target.value = `${maskedInputValue} руб.`;
  e.target.focus();
  e.target.setSelectionRange(trimedValue.length, trimedValue.length);
}