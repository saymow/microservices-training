import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@saymowtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
