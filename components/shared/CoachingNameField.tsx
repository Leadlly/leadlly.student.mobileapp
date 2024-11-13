import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "./Select";
import { FormType } from "../../types/types";
import { useGetInstituteList } from "../../services/queries/instituteQuery";
import { useDebounce } from "use-debounce";

const CoachingNameField = ({
  form,
  overallClassName,
  labelStyle,
  inputStyle,
  inputTextStyle,
}: {
  form: FormType;
  overallClassName?: string;
  labelStyle?: string;
  inputStyle?: string;
  inputTextStyle?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedTerm] = useDebounce(searchTerm, 500);

  const {
    data: coachingData,
    isLoading,
    isFetching,
  } = useGetInstituteList(debouncedTerm);

  return (
    <Controller
      name="coachingName"
      control={form.control}
      render={({ field }) => (
        <Select
          items={
            coachingData &&
            coachingData.institutes &&
            coachingData.institutes.length > 0
              ? coachingData.institutes.map((item) => ({
                  _id: item.intituteId,
                  name: item.name,
                }))
              : []
          }
          defaultValue={field.value}
          onValueChange={field.onChange}
          loading={isLoading}
          fetching={isFetching}
          label="Coaching name"
          placeholder="Select a coaching"
          overallClassName={overallClassName}
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          inputTextStyle={inputTextStyle}
          searchValue={searchTerm}
          setSearchValue={setSearchTerm}
        />
      )}
    />
  );
};

export default CoachingNameField;
