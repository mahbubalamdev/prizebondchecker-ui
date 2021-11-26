var bengali_to_english ={'০': '0','১': '1','২': '2','৩': '3','৪': '4','৫': '5','৬': '6','৭':'7','৮': '8','৯': '9'}
var english_to_bengali={'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'}

export var conver_to_english = (value)=>{
  return value.toString().split('').map(d=>bengali_to_english[d] || d).join('')
}

export var conver_to_bangla = (value)=>{
  return value.toString().split('').map(d=>english_to_bengali[d] || d).join('')
}
