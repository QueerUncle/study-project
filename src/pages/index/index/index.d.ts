interface EntBackParam {
  visible: boolean;
  selectData: Partial<EntItem>[];
}

interface EntItem {
  name: string;
  id: string;
  selected: boolean;
}
