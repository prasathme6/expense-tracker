package com.expense.tracker.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expense.tracker.Entity.Tracker;
import com.expense.tracker.Repository.TrackerRepository;
import com.expense.tracker.dto.ExpenseCategoryResponse;

@Service
public class TrackerService {
	
	@Autowired
	private TrackerRepository repo;
	
	//get all expense
	public List<Tracker> getAll() {
		return repo.findAll();
	}

	//save all expense
	public List<Tracker> postAll(Tracker t) {
		repo.save(t);
		return repo.findAll();
	}
	
	//total expense
	public double totalExp() {
		return repo.getTotal();
	}
	
	//expense based on category
	public ExpenseCategoryResponse getExpensesByCategory(String category) {

        List<Tracker> expenses =
                repo.findByCategory(category);

        double total = expenses.stream()
                .mapToDouble(Tracker::getAmount)
                .sum();

        return new ExpenseCategoryResponse(
                category,
                total,
                expenses
        );
    }
	
	//expense based on payment method
	public ExpenseCategoryResponse getExpensesByPaymentMethod(String paymentMethod) {

        List<Tracker> expenses =
                repo.findByPaymentMethod(paymentMethod);

        double total = expenses.stream()
                .mapToDouble(Tracker::getAmount)
                .sum();

        return new ExpenseCategoryResponse(
        		paymentMethod,
                total,
                expenses
        );
    }

	public void delexp(Long id) {
		repo.deleteById(id);
	}
}
