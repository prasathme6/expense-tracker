package com.expense.tracker.dto;

import java.util.List;

import com.expense.tracker.Entity.Tracker;

public class ExpensePaymentMethodResponse {
	 private String paymentMethod;
	    private double totalExpense;
	    private List<Tracker> expenses;

	    public ExpensePaymentMethodResponse(
	            String paymentMethod,
	            double totalExpense,
	            List<Tracker> expenses) {

	        this.paymentMethod = paymentMethod;
	        this.totalExpense = totalExpense;
	        this.expenses = expenses;
	    }

	    public String getPaymentMethod() {
	        return paymentMethod;
	    }

	    public double getTotalExpense() {
	        return totalExpense;
	    }

	    public List<Tracker> getExpenses() {
	        return expenses;
	    }
}
