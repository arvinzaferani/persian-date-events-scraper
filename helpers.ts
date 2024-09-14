const persianNumbers: RegExp[] = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
const arabicNumbers: RegExp[] = [/٠/, /١/, /٢/, /٣/, /٤/, /٥/, /٦/, /٧/, /٨/, /٩/];
const englishNumberRegExp: RegExp[] = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g,]
const englishNumbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',]
const persianMonths: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
];

export function replacePersianNumber(text: string): string {
    for (let i = 0; i < persianNumbers.length; i++) {
        text = text.replace(persianNumbers[i], englishNumbers[i])
    }
    return text
}

export function textContainsWord(text: string, word: string): boolean {
    const wordsArray: string[] = text.trim().split(' ')
    return wordsArray.includes(word)
}

export function elementHasClass(element: any, className: string) {
    const elementAttributes = element.attr()
    if (elementAttributes.hasOwnProperty('class')) {
        return textContainsWord(elementAttributes.class, className)
    }

    return false
}

export function isLunarEvent(element: string[]) {
    const splitter: string | undefined = element?.[2]
    if (typeof splitter !== undefined) {
        return arabicNumbers.some(aNumber => aNumber.test(splitter))
    }
    return false
}

export function isGregorianEvent(element: string[]) {
    const splitter: string | undefined = element?.[2]
    if (typeof splitter !== undefined) {
        return englishNumberRegExp.some(eNumber => eNumber.test(splitter))
    }
    return false
}

export function convertMonthToNumber(month: string): string {
    let number: number = persianMonths.indexOf(month) + 1
    return convertNumberToDoubleDigitString(number)
}

export function convertNumberToDoubleDigitString(number: number): string {
    if( number < 10 ) return '0' + number.toString()
    return number.toString()
}
