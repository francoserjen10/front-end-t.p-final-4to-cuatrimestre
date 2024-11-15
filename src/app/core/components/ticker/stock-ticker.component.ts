import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-ticker',
  standalone: true,
  imports: [NgFor],
  templateUrl: './stock-ticker.component.html',
  styleUrl: './stock-ticker.component.css'
})
export class StockTickerComponent implements OnInit {

  stocks = [
    { symbol: 'AAPL', price: 1358.90, change: '+13,91 (+1,04%)' },
    { symbol: 'TSLA', price: 1358.90, change: '+13,91 (+1,04%)' },
    { symbol: 'JPM', price: 1358.90, change: '+13,91 (+1,04%)' },
    { symbol: 'ROG.SW', price: 1358.90, change: '+13,91 (+1,04%)' },
    { symbol: 'SHEL', price: 1358.90, change: '+13,91 (+1,04%)' },
    { symbol: 'V', price: 1358.90, change: '+13,91 (+1,04%)' },
    { symbol: 'WMT', price: 1358.90, change: '+13,91 (+1,04%)' }
  ];

  ngOnInit(): void {

  }
}
