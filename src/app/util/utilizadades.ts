export class Util{
    formatarData(date : Date): string{
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}T00:00:00}`
    }
}

