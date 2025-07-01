import { Input, DatePicker, Select, Button, Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";

const { Option } = Select;

export type TEventFilters = {
  title?: string;
  date?: string; // e.g. 2025-07-01
  range?: "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth";
};

type TProps = {
  onFilterChange: (filters: TEventFilters) => void;
};

const EventFilterBar = ({ onFilterChange }: TProps) => {
  const [filters, setFilters] = useState<TEventFilters>({
    date: moment().format("YYYY-MM-DD"), // default to today
  });

  useEffect(() => {
    onFilterChange(filters); // pass filter state up
  }, [filters, onFilterChange]);

  const handleClear = () => {
    setFilters({});
  };

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
        {/* Title Search */}
        <Input
          placeholder="Search by title"
          size="large"
          className="lg:w-1/4"
          allowClear
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        {/* Date Picker (Today filter) */}
        <DatePicker
          size="large"
          className="w-full lg:w-1/4"
          defaultValue={moment()}
          onChange={(date) => {
            const value = date ? moment(date).format("YYYY-MM-DD") : undefined;
            setFilters((prev) => ({ ...prev, date: value }));
          }}
        />

        {/* Date Range Selector */}
        <Select
          placeholder="Select Date Range"
          size="large"
          allowClear
          className="w-full lg:w-1/4"
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, range: value }));
          }}
        >
          <Option value="currentWeek">Current Week</Option>
          <Option value="lastWeek">Last Week</Option>
          <Option value="currentMonth">Current Month</Option>
          <Option value="lastMonth">Last Month</Option>
        </Select>

        {/* Clear Filter Button */}
        <div className="w-full lg:w-1/4">
          <Tooltip title="Clear filters">
            <Button
              size="large"
              icon={<CloseCircleOutlined />}
              onClick={handleClear}
              className="w-full flex justify-center items-center" // 👈 makes it stretch and center the icon
            >
              Clear
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default EventFilterBar;
