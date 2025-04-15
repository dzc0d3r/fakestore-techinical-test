import { AntDesign } from "@expo/vector-icons";
import React from "react";
import renderer from "react-test-renderer";
import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  const mockPress = jest.fn();

  it("renders primary button correctly", () => {
    const tree = renderer
      .create(<Button label="Primary" onPress={mockPress} variant="primary" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders secondary button correctly", () => {
    const tree = renderer
      .create(
        <Button label="Secondary" onPress={mockPress} variant="secondary" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders danger button correctly", () => {
    const tree = renderer
      .create(<Button label="Danger" onPress={mockPress} variant="danger" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders outline button correctly", () => {
    const tree = renderer
      .create(<Button label="Outline" onPress={mockPress} variant="outline" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it("renders loading state correctly", () => {
    const tree = renderer
      .create(<Button label="Loading" onPress={mockPress} loading={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom style correctly", () => {
    const tree = renderer
      .create(
        <Button
          label="Custom Style"
          onPress={mockPress}
          style={{ marginTop: 10, width: 200 }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders primary button with icon and loading state correctly", () => {
    const tree = renderer
      .create(
        <Button
          label="Complete"
          onPress={mockPress}
          variant="primary"
          icon={<AntDesign name="check" size={16} color="white" />}
          loading={true}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
