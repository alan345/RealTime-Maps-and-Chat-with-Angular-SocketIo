


//
// export class ShowNavBarData {
//   rightSideBar = new SideBarData()
//   leftSideBar = new SideBarData()
//
// }
// export class SideBarData {
export class ShowNavBarData {
  showNavBar: boolean = true;
  search: Search = new Search();
}

export class Search {
    typeObj: string = '';
    typeScreen: string = 'object';
    userId: string = '';
    briefId: string = '';
    projectId: string = '';
    documentId: string = '';
    missionId: string = '';
    stratId: string = '';
    categorieId: string = '';
    search: string = '';
    orderBy: string = '';
    start: Date;
    // startString: string = '';
    end: Date;
    // endString: string = '';
    // missionType: string = '';
    isExternalUser: boolean = false;
    myDocuments: boolean = true;

}

export class PaginationData {
  currentPage: number = 1;
  itemsPerPage: number = 0;
  totalItems: number = 0;
};
