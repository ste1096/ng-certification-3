import { Observable, Subscription, timer } from 'rxjs'

import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css'],
})
export class StateButtonComponent implements OnInit {
  @Input() action$: Observable<any>
  @Input() initialTemplateRef: TemplateRef<any>
  @Input() loadingTemplateRef: TemplateRef<any>
  @Input() errorTemplateRef: TemplateRef<any>
  @Input() doneTemplateRef: TemplateRef<any>
  @Input() disabled = false

  @Output() onDone: EventEmitter<any> = new EventEmitter<any>()

  currentTemplateRef: TemplateRef<any>
  loading = false
  actionReset$ = timer(500)

  subscriptions: Subscription[] = []

  ngOnInit() {
    this.currentTemplateRef = this.initialTemplateRef
  }

  ngOnDestroy() {
    this.unsubscribeAll()
  }

  triggerAction() {
    if (this.action$) {
      this.currentTemplateRef = this.loadingTemplateRef
      this.loading = true
      const subscription = this.action$.subscribe(
        (result) => {
          this.onDone.emit(result)
          this.loading = false
          this.currentTemplateRef = this.doneTemplateRef
          this.resetState()
        },
        (error) => {
          this.currentTemplateRef = this.errorTemplateRef
          this.loading = false
          this.resetState()
        }
      )
      this.subscriptions?.push(subscription)
    }
  }

  resetState() {
    const sub = this.actionReset$?.subscribe(() => {
      this.currentTemplateRef = this.initialTemplateRef
      this.unsubscribeAll()
    })
    this.subscriptions?.push(sub)
  }

  private unsubscribeAll() {
    this.subscriptions?.forEach((sub) => {
      sub?.unsubscribe()
    })
  }
}
