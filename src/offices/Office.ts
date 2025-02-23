/* eslint-disable @typescript-eslint/no-explicit-any */
export class Office {
    id: number | undefined;
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    officeTypeId: number | undefined;
    officeOpenedOn: Date = new Date();
    revenue: number = 0;
    isHeadOffice: boolean = false;
    get isNew(): boolean {
      return this.id === undefined;
    }
  
    constructor(initializer?: any) {
      if (!initializer) return;
      if (initializer.id) this.id = initializer.id;
      if (initializer.name) this.name = initializer.name;
      if (initializer.description) this.description = initializer.description;
      if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
      if (initializer.officeTypeId)
        this.officeTypeId = initializer.officeTypeId;
      if (initializer.officeOpenedOn)
        this.officeOpenedOn = new Date(initializer.officeOpenedOn);
      if (initializer.revenue) this.revenue = initializer.revenue;
      if (initializer.isHeadOffice) this.isHeadOffice = initializer.isHeadOffice;
    }
  }