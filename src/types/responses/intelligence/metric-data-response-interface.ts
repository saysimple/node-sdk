export interface MetricDataResponseInterface {
    /**
     * Data is aggregated by a certain time group. This is calculated automatically upon
     * request and depends on the date range requested.
     */
    aggregatedBy: "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR";

    /**
     * The first date in the returned data set.
     * This property is omitted if data set is empty.
     */
    firstDataOccurrence?: string;

    /**
     * The last date in the returned data set.
     * This property is omitted if data set is empty.
     */
    lastDataOccurrence?: string;

    /**
     * Data is an array of key - value objects containing the date as key
     * and a numeric value for the data.
     * Please be aware that if the data is aggregated by "week" or "quarter" the dates are not valid ISO8601.
     * Format is "YYYY-[WEEK NUMBER]" for weeks and "YYYY-[QUARTER]" for quarters.
     */
    data: { [date: string]: number }[]
}
