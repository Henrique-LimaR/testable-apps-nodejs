export interface ApointmentProps { 
  customer: string 
  startsAt: Date 
  endsAt: Date
}

export class Apointment {
  private props: ApointmentProps;

  get customer() {
    return this.props.customer
  }

  get startsAt() {
    return this.props.startsAt
  }

  get endsAt() {
    return this.props.endsAt
  }

  constructor(props: ApointmentProps){
    const { startsAt, endsAt } = props;
    
    if(startsAt <= new Date()){
      throw new Error("Can't add start date before now!"); 
    }
    if(startsAt >= endsAt){
      throw new Error("Invalid date!");
    };
    
    this.props = props
  }
  
};
