interface VenueItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }
  
  export interface VenueJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: VenueItem[]
  }


  export interface CompanyJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: CompanyItem[]
  }

  interface CompanyItem{
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    website: string,
    description: string,
    telephonenumber: string,
    __v: number,
  }

  export type JobPostingJson = {
    count: number;
    data: {
        _id: string;
        title: string;
        jobdescription: string;
        requirement: string;
        salary_range: string;
        jobtype: "Full-time" | "Part-time" | "Contract" | "Internship" | "Temporary";
        company: {
            _id: string;
            name: string;
        };
        posted_date: string;
    }[];
  };

  export type InterviewJson = {
    count: number;
    data: {
        _id: string;
        intwDate: string;
        user: string;
        company: {
            _id: string;
            name: string;
            province: string;
            telephonenumber: string;
        };
        createdAt: string;
        __v: number;
    }[];
};
