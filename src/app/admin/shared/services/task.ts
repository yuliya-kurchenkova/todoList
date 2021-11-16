export class MyTask {
  id?: string | any;
  title!: string;
  description!: string;
  date!: string;
  status: string = 'new';
  newComment?: string;
  dateAdd: any;
}

export class MyComment {
  newComment!: string;
  id?: string
}
