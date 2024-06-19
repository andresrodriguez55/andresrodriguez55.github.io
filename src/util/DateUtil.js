class DateUtil {
    static convertStringDateTimezoneToClient(stringDate) {
        try {
            const serverDate = new Date(stringDate.replace('T', ' ') + ' +03:00'); // Server timezone
            if (isNaN(serverDate)) {
                throw new Error("Invalid Date");
            }

            return serverDate.toLocaleString('es-ES', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                day: 'numeric',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
        } catch (error) {
            // Prevent invalid date, return actual client date
            return new Date().toLocaleString('es-ES', {
                day: 'numeric',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
        }
    }
}

export default DateUtil;