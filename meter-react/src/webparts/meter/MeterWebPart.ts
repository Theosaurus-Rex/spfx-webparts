import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneCheckbox,
  PropertyPaneDropdown

} from '@microsoft/sp-property-pane';
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle
} from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker'
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MeterWebPartStrings';
import Meter from './components/Meter';
import { IMeterProps } from './components/IMeterProps';

export interface IMeterWebPartProps {
  title: string;
  description: string;
  percentage: number;
  showPercentageValue: boolean;
  headerAlignment: string;
  fillColor: string;
}

export default class MeterWebPart extends BaseClientSideWebPart<IMeterWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMeterProps> = React.createElement(
      Meter,
      {
        title: this.properties.title,
        description: this.properties.description,
        percentage: this.properties.percentage,
        showPercentageValue: this.properties.showPercentageValue,
        headerAlignment: this.properties.headerAlignment,
        fillColor: this.properties.fillColor
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Meter Settings'
          },
          groups: [
            {
              groupName: "Header Settings",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyPaneDropdown('headerAlignment', {
                  label: 'Header Alignment',
                  options: [
                    {key: 'left', text: 'Left' },
                    {key: 'center', text: 'Center' },
                    {key: 'right', text: 'Right' },
                  ]
                })
                
              ]
            },
            {
              groupName: 'Chart Settings',
              groupFields: [
                PropertyPaneSlider('percentage', {
                  min: 0,
                  max: 100,
                  step: 1,
                }),
                PropertyPaneLabel(
                  null,
                  {
                    text: 'Enter a number between 0 and 100'
                  }
                ),
                PropertyPaneCheckbox('showPercentageValue', {
                  text: 'Show Percentage'
                }),
                PropertyFieldColorPicker('fillColor', {
                  label: 'Color',
                  selectedColor: this.properties.fillColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: true,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
