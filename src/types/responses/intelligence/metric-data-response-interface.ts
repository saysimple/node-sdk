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

    /**
     * Aggregated value can be a sum, average or median of the selected period.
     * For example if yoy requested the sum of messages, the aggregated value will be the sum of the total messages returned.
     */
    aggregatedValue: number

    /**
     * Previous aggregated value can be a sum, average or median of the previous period.
     * For example if you requested the sum of messages from the period 2019-2020, the previous aggregated value will be
     * the sum of total messages from the period 2018-2019.
     */
    previousAggregatedValue: number
}
