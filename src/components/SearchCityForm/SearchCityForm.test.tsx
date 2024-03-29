// SearchCityForm.test.js
import React from "react";
import { render } from "@/testUtils";
import { SearchCityForm } from "./SearchCityForm";
import { fireEvent } from "@testing-library/react";

const closeBackdrop = jest.fn();
jest.mock("@/hooks/useSearchCityForm", () => ({
  useSearchCityForm: () => ({
    onOpenAutocomplete: jest.fn(),
    onCloseAutocomplete: jest.fn(),
    onInputChange: jest.fn(),
    options: [{ name: "Cidade Exemplo", id: "1" }],
    isLoading: false,
    onSelectCity: jest.fn(),
    onSelectLastCity: jest.fn(),
    showAutoComplete: true,
    showLastCities: true,
    closeBackdrop,
    isOpenBackdrop: true,
    defaultValue: null,
  }),
}));

describe("SearchCityForm", () => {
  it("renders without crashing", () => {
    const onSelectMock = jest.fn();
    render(<SearchCityForm onSelect={onSelectMock} />);
  });

  it("calls onSelect with the selected city", async () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<SearchCityForm onSelect={onSelectMock} />);

    const option = getByText("Cidade Exemplo");
    fireEvent.click(option);

    expect(onSelectMock).toHaveBeenCalledWith(expect.anything());
  });

  it("closes BackdropContainer on click", async () => {
    const onSelectMock = jest.fn();
    const { getByTestId } = render(<SearchCityForm onSelect={onSelectMock} />);
    const backdrop = getByTestId("backdrop-container");
    expect(backdrop).toBeTruthy();

    fireEvent.click(backdrop);
    expect(closeBackdrop).toHaveBeenCalled();
  });
});
