package com.expense.tracker.dto;

import java.util.List;

import com.expense.tracker.Entity.Tracker;

public class ExpenseCategoryResponse {

    private String category;
    private double totalExpense;
    private List<Tracker> expenses;

    public ExpenseCategoryResponse(
            String category,
            double totalExpense,
            List<Tracker> expenses) {

        this.category = category;
        this.totalExpense = totalExpense;
        this.expenses = expenses;
    }

    public String getCategory() {
        return category;
    }

    public double getTotalExpense() {
        return totalExpense;
    }

    public List<Tracker> getExpenses() {
        return expenses;
    }
}
