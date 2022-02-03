package com.great_team.projects.pilote.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.great_team.projects.pilote.entity.Pilote;
import com.great_team.projects.pilote.service.PiloteService;

@RestController
@RequestMapping("/great_team/pilote")
@CrossOrigin
public class PiloteController {
	
	private PiloteService piloteService;
	
	@Autowired
	public PiloteController(PiloteService piloteService) {
		 this.piloteService =  piloteService;
	}
	@GetMapping("/availabale")
	public List<Pilote> getAvailablePiloteList() {
		return piloteService.getAvailabalePilote();
	}
	@GetMapping("/all")
	public List<Pilote> getPiloteList() {
		return piloteService.getPiloteList();
	}
	@GetMapping("/{id}")
	public Optional<Pilote> getPiloteById(@PathVariable("id") Long id) {
		return piloteService.getPiloteById(id);
	}
	@GetMapping("/{id}/{info}")
	public String getPiloteInfoById(@PathVariable("id") Long id, @PathVariable("info") String info) {
		return piloteService.getPiloteInfoById(id, info);
	}
	@PostMapping("/nouveau")
	public String postPilote(@RequestBody Pilote pilote) {
		return this.piloteService.save(pilote);
	}
	@PutMapping("/update")
	public String upDatePilote(@RequestBody Pilote pilote) {
		return this.piloteService.upDate(pilote);
	}
	@DeleteMapping("/delete/{id}")
	public String deletePilote(@PathVariable("id") Long id) {
		 return this.piloteService.delete(id);
	}
}
