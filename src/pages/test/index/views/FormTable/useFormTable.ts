/*
  @Author: lize
  @Date: 2021/5/29
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/5/29
*/
import { reactive, ref } from 'vue';
import { ItemMouldValue, ItemMouldData } from './fieldsConfig';
const selectWidget = reactive({
  data: { id: '' },
});
const TemplateList = reactive([]);
const FormValues = reactive({});

export const createDragData = (data) => {
  const copyItemMouldData = JSON.parse(JSON.stringify(ItemMouldData));
  const copyItemMouldValue = JSON.parse(JSON.stringify(ItemMouldValue));
  copyItemMouldData.id = `fieldId_${new Date().getTime()}`;
  copyItemMouldData.type = data.type;
  copyItemMouldData.name = data.name || data.label;
  copyItemMouldData.attributes.fieldId = copyItemMouldData.id;
  copyItemMouldData.attributes.label = copyItemMouldData.name;
  copyItemMouldData.attributes.type = copyItemMouldData.type;
  return {
    itemData: copyItemMouldData,
    itemValue: data.type === 'group' ? null : copyItemMouldValue,
  };
};
export const handleSelectWidget = (SelectWidget, index, templateList) => {
  console.log(SelectWidget, templateList[index]);
  selectWidget.data = templateList[index]; // eslint-disable-line
};
export const handleDragAdd = (evt, templateList, formValues, SelectWidget) => {
  const { itemData, itemValue } = createDragData(evt.data);
  templateList.splice(evt.newIndex, 0, reactive(itemData));
  if (itemValue) {
    formValues[itemData.id] = itemValue; // eslint-disable-line
  }
  handleSelectWidget(SelectWidget, evt.newIndex, templateList);
};
export const handleDragRemove = (evt, templateList, formValues, SelectWidget) => {
  const target = JSON.parse(JSON.stringify(templateList[evt.oldIndex]));
  templateList.splice(evt.oldIndex, 1);
  delete formValues[target.id]; // eslint-disable-line
  if (templateList.length) {
    handleSelectWidget(SelectWidget, templateList.length - 1, templateList);
  }
};
export const handleDelete = (index, item, templateList, formValues, SelectWidget) => {
  templateList.splice(index, 1);
  delete formValues[item.id]; // eslint-disable-line
  if (templateList.length) {
    handleSelectWidget(SelectWidget, templateList.length - 1, templateList);
  }
};
export const handleFieldClick = (item, templateList, SelectWidget) => {
  const { itemData, itemValue } = createDragData(item);
  templateList.push(itemData);
  if (itemValue) {
    FormValues[itemData.id] = itemValue; // eslint-disable-line
  }
  handleSelectWidget(SelectWidget, templateList.length - 1, templateList);
};
export const useFormTable = () => ({
  selectWidget,
  TemplateList,
  FormValues,
});
